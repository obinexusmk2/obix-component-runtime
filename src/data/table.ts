import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export type SortDirection = 'ascending' | 'descending' | 'none';

export interface ColumnDef {
  id: string;
  label: string;
  sortable?: boolean;
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
}

export type RowData = Record<string, string | number | boolean>;

export interface TableState {
  caption: string;
  columns: ColumnDef[];
  rows: RowData[];
  sortColumn: string | null;
  sortDirection: SortDirection;
  selectedRows: string[];
  tableId: string;
}

export interface TableConfig {
  caption: string;
  columns: ColumnDef[];
  rows?: RowData[];
  id?: string;
}

function renderTable(state: TableState): string {
  const headers = state.columns.map((col) => {
    const sort: SortDirection = col.id === state.sortColumn ? state.sortDirection : 'none';
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

export function createTable(config: TableConfig): ComponentLogicWithAccessibility<TableState> {
  const id = config.id ?? `obix-table-${Math.random().toString(36).slice(2, 8)}`;
  const logic: ComponentLogicWithAccessibility<TableState> = {
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
      sortBy: (state, columnId: unknown) => {
        const col = String(columnId);
        if (state.sortColumn === col) {
          return {
            sortDirection: state.sortDirection === 'ascending' ? 'descending' as SortDirection : 'ascending' as SortDirection,
          };
        }
        return { sortColumn: col, sortDirection: 'ascending' as SortDirection };
      },
      setRows: (_state, rows: unknown) => ({ rows: rows as RowData[] }),
      selectRow: (state, id: unknown) => ({
        selectedRows: [...state.selectedRows, String(id)],
      }),
      deselectRow: (state, id: unknown) => ({
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
