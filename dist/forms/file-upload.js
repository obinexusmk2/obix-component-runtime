import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function formatSize(bytes) {
    if (bytes < 1024)
        return `${bytes} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function renderFileUpload(state) {
    const fileList = state.files.map((f, i) => `
    <li class="obix-file-upload__file-item" role="listitem">
      <span>${f.name} (${formatSize(f.size)})</span>
      ${f.progress < 100
        ? `<progress class="obix-progress" value="${f.progress}" max="100" role="progressbar" aria-valuenow="${f.progress}" aria-valuemin="0" aria-valuemax="100" aria-label="Upload progress for ${f.name}"></progress>`
        : '<span aria-label="Upload complete">✓</span>'}
      ${f.error ? `<span class="obix-file-upload__error" role="alert">${f.error}</span>` : ''}
      <button class="obix-button obix-file-upload__file-item-remove" type="button" aria-label="Remove ${f.name}">×</button>
    </li>`).join('');
    return `<div
  class="obix-file-upload${state.dragging ? ' obix-file-upload--dragging' : ''}"
  data-jfix-strategy="fixed-size"
  aria-label="${state.label}"
  ${state.uploading ? 'aria-busy="true"' : ''}
>
  <input
    type="file"
    id="${state.inputId}"
    class="obix-file-upload__input"
    accept="${state.accept}"
    ${state.multiple ? 'multiple' : ''}
    aria-label="${state.label}"
    style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);"
  />
  <label for="${state.inputId}" class="obix-file-upload__label">
    <span aria-hidden="true">📁</span>
    <span>${state.label}</span>
    <span class="obix-file-upload__hint">Drag and drop or click to browse${state.accept ? ` (${state.accept})` : ''}${state.maxSize ? ` — max ${formatSize(state.maxSize)}` : ''}</span>
  </label>
  ${state.errors.length > 0
        ? `<ul class="obix-file-upload__errors" role="list">
        ${state.errors.map((e) => `<li role="alert" class="obix-file-upload__error">${e}</li>`).join('')}
      </ul>`
        : ''}
  ${state.files.length > 0
        ? `<ul class="obix-file-upload__file-list" role="list" aria-label="Selected files">${fileList}</ul>`
        : ''}
</div>`;
}
export function createFileUpload(config) {
    const id = config.id ?? `obix-fileupload-${Math.random().toString(36).slice(2, 8)}`;
    const logic = {
        name: 'ObixFileUpload',
        state: {
            files: [],
            dragging: false,
            uploading: false,
            overallProgress: 0,
            maxSize: config.maxSize ?? 10 * 1024 * 1024,
            accept: config.accept ?? '*/*',
            multiple: config.multiple ?? true,
            label: config.label,
            inputId: id,
            errors: [],
        },
        actions: {
            addFiles: (state, rawFiles) => {
                const files = rawFiles;
                const errors = [];
                const valid = [];
                for (const f of files) {
                    if (f.size > state.maxSize) {
                        errors.push(`${f.name} exceeds maximum size of ${formatSize(state.maxSize)}.`);
                    }
                    else {
                        valid.push({ name: f.name, size: f.size, type: f.type, progress: 0, error: null });
                    }
                }
                const newFiles = state.multiple ? [...state.files, ...valid] : valid;
                return { files: newFiles, errors };
            },
            removeFile: (state, index) => ({
                files: state.files.filter((_, i) => i !== Number(index)),
            }),
            setProgress: (state, index, progress) => {
                const files = state.files.map((f, i) => i === Number(index) ? { ...f, progress: Number(progress) } : f);
                const overall = files.reduce((s, f) => s + f.progress, 0) / files.length;
                return { files, overallProgress: overall };
            },
            startUpload: (_state) => ({ uploading: true }),
            completeUpload: (_state) => ({ uploading: false, overallProgress: 100 }),
            setDragging: (_state, dragging) => ({ dragging: Boolean(dragging) }),
            clearErrors: (_state) => ({ errors: [] }),
        },
        render: renderFileUpload,
        aria: {
            role: 'button',
            'aria-label': config.label,
            'aria-busy': false,
        },
        touchTarget: DEFAULT_TOUCH_TARGET,
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=file-upload.js.map