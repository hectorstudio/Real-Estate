import { schema } from 'normalizr';

export const permissionSchema = new schema.Entity('permissions');
export const buildingSchema = new schema.Entity('buildings', {
  permissions: [permissionSchema],
});
export const fileSchema = new schema.Entity('files');
export const uploadSchema = new schema.Entity('uploads');
export const userSchema = new schema.Entity('users');
