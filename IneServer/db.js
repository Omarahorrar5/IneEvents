import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Wrapper to make Supabase work like pg query interface
export default {
  query: async (text, params) => {
    try {
      // Parse the SQL query to determine operation
      const queryLower = text.toLowerCase().trim();
      
      // SELECT queries
      if (queryLower.startsWith('select')) {
        return await handleSelect(text, params);
      }
      
      // INSERT queries
      if (queryLower.startsWith('insert')) {
        return await handleInsert(text, params);
      }
      
      // UPDATE queries
      if (queryLower.startsWith('update')) {
        return await handleUpdate(text, params);
      }
      
      // DELETE queries
      if (queryLower.startsWith('delete')) {
        return await handleDelete(text, params);
      }
      
      throw new Error('Unsupported query type');
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }
};

// Helper to extract table name from query
function getTableName(query) {
  const fromMatch = query.match(/from\s+(\w+)/i);
  const intoMatch = query.match(/into\s+(\w+)/i);
  const updateMatch = query.match(/update\s+(\w+)/i);
  return (fromMatch || intoMatch || updateMatch)?.[1];
}

// Handle SELECT queries
async function handleSelect(text, params) {
  const table = getTableName(text);
  let query = supabase.from(table).select('*');
  
  // Handle WHERE conditions
  if (text.includes('where')) {
    const conditions = parseWhereConditions(text, params);
    conditions.forEach(({ column, value }) => {
      query = query.eq(column, value);
    });
  }
  
  // Handle ORDER BY
  if (text.includes('order by')) {
    const orderMatch = text.match(/order by\s+(\w+)(\s+(asc|desc))?/i);
    if (orderMatch) {
      const column = orderMatch[1];
      const direction = orderMatch[3]?.toLowerCase() === 'desc';
      query = query.order(column, { ascending: !direction });
    }
  }
  
  // Handle JOINs for special cases
  if (text.includes('inner join')) {
    return await handleJoinQuery(text, params);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  return { rows: data || [], rowCount: data?.length || 0 };
}

// Handle INSERT queries
async function handleInsert(text, params) {
  const table = getTableName(text);
  const columns = extractColumns(text);
  
  const insertData = {};
  columns.forEach((col, idx) => {
    insertData[col] = params[idx];
  });
  
  const { data, error } = await supabase
    .from(table)
    .insert([insertData])
    .select();
  
  if (error) throw error;
  
  return { rows: data || [], rowCount: 1 };
}

// Handle UPDATE queries
async function handleUpdate(text, params) {
  const table = getTableName(text);
  const setColumns = extractSetColumns(text);
  const whereConditions = parseWhereConditions(text, params);
  
  const updateData = {};
  setColumns.forEach((col, idx) => {
    updateData[col] = params[idx];
  });
  
  let query = supabase.from(table).update(updateData);
  
  // Apply WHERE conditions
  const whereParamOffset = setColumns.length;
  whereConditions.forEach(({ column }, idx) => {
    query = query.eq(column, params[whereParamOffset + idx]);
  });
  
  const { data, error } = await query.select();
  
  if (error) throw error;
  
  return { rows: data || [], rowCount: data?.length || 0 };
}

// Handle DELETE queries
async function handleDelete(text, params) {
  const table = getTableName(text);
  const whereConditions = parseWhereConditions(text, params);
  
  let query = supabase.from(table).delete();
  
  whereConditions.forEach(({ column, value }) => {
    query = query.eq(column, value);
  });
  
  const { data, error } = await query.select();
  
  if (error) throw error;
  
  return { rows: data || [], rowCount: data?.length || 0 };
}

// Handle JOIN queries (for likes and registrations)
async function handleJoinQuery(text, params) {
  if (text.includes('event_likes')) {
    const { data, error } = await supabase
      .from('event_likes')
      .select('*, events(*)')
      .eq('user_id', params[0])
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Flatten the joined data
    const rows = data?.map(item => ({
      ...item.events,
      liked_at: item.created_at
    })) || [];
    
    return { rows, rowCount: rows.length };
  }
  
  if (text.includes('event_registrations')) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*, events(*)')
      .eq('user_id', params[0])
      .order('registration_date', { ascending: false });
    
    if (error) throw error;
    
    const rows = data?.map(item => ({
      ...item.events,
      registration_date: item.registration_date
    })) || [];
    
    return { rows, rowCount: rows.length };
  }
  
  throw new Error('Unsupported JOIN query');
}

// Extract column names from INSERT statement
function extractColumns(query) {
  const match = query.match(/\(([^)]+)\)\s*values/i);
  if (!match) return [];
  return match[1].split(',').map(col => col.trim());
}

// Extract column names from UPDATE SET clause
function extractSetColumns(query) {
  const match = query.match(/set\s+(.+?)\s+where/i);
  if (!match) return [];
  return match[1].split(',').map(part => {
    const col = part.trim().split('=')[0].trim();
    return col;
  });
}

// Parse WHERE conditions
function parseWhereConditions(query, params) {
  const whereMatch = query.match(/where\s+(.+?)(\s+order|\s*$)/i);
  if (!whereMatch) return [];
  
  const wherePart = whereMatch[1];
  const conditions = wherePart.split('and').map(cond => {
    const parts = cond.trim().split(/\s*=\s*/);
    return { column: parts[0].trim(), operator: '=', placeholder: parts[1]?.trim() };
  });
  
  return conditions.map((cond, idx) => ({
    column: cond.column,
    value: params[idx]
  }));
}

export { supabase };