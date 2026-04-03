import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface UploadedFile {
    name: string;
    size: number;
    type: string;
    progress: number;
    error: string | null;
}
export interface FileUploadState {
    files: UploadedFile[];
    dragging: boolean;
    uploading: boolean;
    overallProgress: number;
    maxSize: number;
    accept: string;
    multiple: boolean;
    label: string;
    inputId: string;
    errors: string[];
}
export interface FileUploadConfig {
    label: string;
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    id?: string;
}
export declare function createFileUpload(config: FileUploadConfig): ComponentLogicWithAccessibility<FileUploadState>;
//# sourceMappingURL=file-upload.d.ts.map