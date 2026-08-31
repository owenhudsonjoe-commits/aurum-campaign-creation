CREATE TABLE public.catalog_state (
  id text PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.catalog_state TO anon;
GRANT SELECT ON public.catalog_state TO authenticated;
GRANT ALL ON public.catalog_state TO service_role;

ALTER TABLE public.catalog_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Catalog is publicly readable"
  ON public.catalog_state FOR SELECT
  USING (true);