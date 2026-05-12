export const login: (password: string) => Promise<any>;
export const getFiles: (token: string, params?: any) => Promise<any>;
export const getFileById: (token: string, fileId: string) => Promise<any>;
export const createFile: (token: string, fileData: any) => Promise<any>;
export const updateFile: (token: string, fileId: string, fileData: any) => Promise<any>;
export const deleteFile: (token: string, fileId: string) => Promise<any>;
export const deleteAllFiles: (token: string) => Promise<any>;
export const getFileStats: (token: string) => Promise<any>;
export const bulkUploadFiles: (token: string, files: any[]) => Promise<any>;
export const getProjects: () => Promise<any>;
export const createProject: (token: string, projectData: any) => Promise<any>;
export const deleteProject: (token: string, projectId: string) => Promise<any>;
export const uploadProjectFiles: (token: string, projectId: string, files: any[]) => Promise<any>;
export const getDocumentations: () => Promise<any>;
export const createDocumentation: (token: string, docData: FormData) => Promise<any>;
export const deleteDocumentation: (token: string, docId: string) => Promise<any>;

declare const api: any;
export default api;
