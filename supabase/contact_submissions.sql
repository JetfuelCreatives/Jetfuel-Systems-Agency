-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- Creates the contact_submissions table for the contact form

create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Allow anyone to insert (for contact form submissions)
alter table contact_submissions enable row level security;

create policy "Allow anonymous inserts"
  on contact_submissions
  for insert
  to anon
  with check (true);
