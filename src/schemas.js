import { schema } from 'normalizr';

export const buildingSchema = new schema.Entity('buildings');
export const fileSchema = new schema.Entity('files');
export const uploadSchema = new schema.Entity('uploads');
export const userSchema = new schema.Entity('users');
