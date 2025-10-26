/*
  # Create tasks table for AIBOS TODO app

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text, task description)
      - `completed` (boolean, completion status)
      - `created_at` (timestamptz, auto-generated)
      - `updated_at` (timestamptz, auto-updated)
  
  2. Security
    - Enable RLS on `tasks` table
    - Add policy for public access (since no auth is required)
    
  3. Notes
    - Tasks are ordered by created_at descending by default
    - All users can create, read, update, and delete tasks
*/

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public to view tasks"
  ON tasks
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public to insert tasks"
  ON tasks
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to update tasks"
  ON tasks
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public to delete tasks"
  ON tasks
  FOR DELETE
  TO anon
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS tasks_created_at_idx ON tasks(created_at DESC);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
