declare module 'mongoose' {
  interface DeleteModel<T extends Document> extends Model<T> {
    delete(conditions: any): { n: number; nModified: number; ok: number };
  }
}
