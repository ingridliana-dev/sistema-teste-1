-- Enable RLS
ALTER DATABASE postgres SET "app.settings.jwt_secret" = 'your-super-secret-jwt-token';

-- Create tables
CREATE TABLE IF NOT EXISTS professionals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    initials VARCHAR(3) NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS activity_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    color VARCHAR(7) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS time_slots (
    id SERIAL PRIMARY KEY,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    interval INTEGER NOT NULL,
    is_base_slot BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(start_time, end_time)
);

CREATE TABLE IF NOT EXISTS storage (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Create policies
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON professionals FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON professionals FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON professionals FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON professionals FOR DELETE USING (true);

ALTER TABLE activity_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON activity_types FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON activity_types FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON activity_types FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON activity_types FOR DELETE USING (true);

ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON time_slots FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON time_slots FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON time_slots FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON time_slots FOR DELETE USING (true);

ALTER TABLE storage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON storage FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON storage FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON storage FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON storage FOR DELETE USING (true);

-- Insert default data
INSERT INTO activity_types (name, code, color) VALUES
    ('Aula Regular', 'AR', '#4CAF50'),
    ('Reunião', 'RE', '#2196F3'),
    ('Planejamento', 'PL', '#FFC107'),
    ('Atendimento', 'AT', '#9C27B0')
ON CONFLICT (id) DO NOTHING;

INSERT INTO time_slots (start_time, end_time, interval, is_base_slot) VALUES
    ('08:00', '08:30', 30, true),
    ('08:30', '09:00', 30, true),
    ('09:00', '09:30', 30, true),
    ('09:30', '10:00', 30, true),
    ('10:00', '10:30', 30, true),
    ('10:30', '11:00', 30, true),
    ('11:00', '11:30', 30, true),
    ('11:30', '12:00', 30, true),
    ('13:00', '13:30', 30, true),
    ('13:30', '14:00', 30, true),
    ('14:00', '14:30', 30, true),
    ('14:30', '15:00', 30, true),
    ('15:00', '15:30', 30, true),
    ('15:30', '16:00', 30, true),
    ('16:00', '16:30', 30, true),
    ('16:30', '17:00', 30, true),
    ('17:00', '17:30', 30, true),
    ('17:30', '18:00', 30, true),
    ('18:00', '18:30', 30, true),
    ('18:30', '19:00', 30, true)
ON CONFLICT (start_time, end_time) DO NOTHING;
