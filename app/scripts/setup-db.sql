-- Enable pgvector extension for future similarity search
create extension if not exists vector;

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  brand_country text,
  category text not null,
  subcategory text,
  price_eur decimal not null,
  materials text[] default '{}',
  styles text[] default '{}',
  colors text[] default '{}',
  design_feel text[] default '{}',
  room_types text[] default '{}',
  values text[] default '{}',
  description text,
  image_url text,
  embedding vector(1536),
  created_at timestamptz default now()
);

-- Enable RLS but allow public read
alter table products enable row level security;

create policy "Products are publicly readable"
  on products for select
  using (true);

create policy "Service role can manage products"
  on products for all
  using (auth.role() = 'service_role');

-- Index for filtering
create index if not exists idx_products_category on products (category);
create index if not exists idx_products_brand on products (brand);
create index if not exists idx_products_styles on products using gin (styles);
create index if not exists idx_products_design_feel on products using gin (design_feel);
