import type { ComponentLogicWithAccessibility } from '../types/base.js';
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
export declare function createTable(config: TableConfig): ComponentLogicWithAccessibility<TableState>;
//# sourceMappingURL=table.d.ts.map