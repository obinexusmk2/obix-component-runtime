import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderTable(state) {
    const headers = state.columns.map((col) => {
        const sort = col.id === state.sortColumn ? state.sortDirection : 'none';
        return `<th
      scope="${col.scope ?? 'col'}"
      ${col.sortable ? `aria-sort="${sort}" tabindex="0" data-jfix-strategy="fixed-size"` : ''}
      class="obix-table__th${col.sortable ? ' obix-table__th--sortable' : ''}"
    >${col.label}${col.sortable ? `<span aria-hidden="true"> ${sort === 'ascending' ? '↑' : sort === 'descending' ? '↓' : '↕'}</span>` : ''}</th>`;
    }).join('');
    const rowsHtml = state.rows.map((row) => {
        const cells = state.columns.map((col) => `<td class="obix-table__td">${row[col.id] ?? ''}</td>`).join('');
        return `<tr class="obix-table__tr">${cells}</tr>`;
    }).join('');
    return `<div class="obix-table-wrapper" style="overflow-x:auto;">
  <table
    id="${state.tableId}"
    class="obix-table"
    aria-label="${state.caption}"
  >
    <caption class="obix-table__caption">${state.caption}</caption>
    <thead class="obix-table__thead">
      <tr>${headers}</tr>
    </thead>
    <tbody class="obix-table__tbody">
      ${rowsHtml}
    </tbody>
  </table>
</div>`;
}
export function createTable(config) {
    const id = config.id ?? `obix-table-${Math.random().toString(36).slice(2, 8)}`;
    const logic = {
        name: 'ObixTable',
        state: {
            caption: config.caption,
            columns: config.columns,
            rows: config.rows ?? [],
            sortColumn: null,
            sortDirection: 'none',
            selectedRows: [],
            tableId: id,
        },
        actions: {
            sortBy: (state, columnId) => {
                const col = String(columnId);
                if (state.sortColumn === col) {
                    return {
                        sortDirection: state.sortDirection === 'ascending' ? 'descending' : 'ascending',
                    };
                }
                return { sortColumn: col, sortDirection: 'ascending' };
            },
            setRows: (_state, rows) => ({ rows: rows }),
            selectRow: (state, id) => ({
                selectedRows: [...state.selectedRows, String(id)],
            }),
            deselectRow: (state, id) => ({
                selectedRows: state.selectedRows.filter((r) => r !== String(id)),
            }),
            selectAll: (state) => ({
                selectedRows: state.rows.map((_, i) => String(i)),
            }),
            deselectAll: (_state) => ({ selectedRows: [] }),
        },
        render: renderTable,
        aria: {
            role: 'table',
            'aria-label': config.caption,
        },
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=table.js.map