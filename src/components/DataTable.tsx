import React, { useMemo, useState } from 'react'

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  width?: string
}

export interface DataTableProps<T extends { id: number | string }> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>('asc')
  const [selected, setSelected] = useState<Set<number | string>>(new Set())

  // sorting using the chosen key
  const sortedData = useMemo(() => {
    if (!sortKey) return data
    const arr = [...data]
    arr.sort((a, b) => {
      const va = a[sortKey]
      const vb = b[sortKey]

      if (va == null && vb == null) return 0
      if (va == null) return 1
      if (vb == null) return -1

      if (typeof va === 'number' && typeof vb === 'number')
        return sortDir === 'asc' ? va - vb : vb - va

      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })
    return arr
  }, [data, sortKey, sortDir])

  function toggleSort(column: Column<T>) {
    if (!column.sortable) return
    const key = column.dataIndex
    if (sortKey === key) {
      // cycle asc -> desc -> none
      if (sortDir === 'asc') setSortDir('desc')
      else if (sortDir === 'desc') {
        setSortKey(null)
        setSortDir('asc')
      } else setSortDir('asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function toggleSelectRow(id: number | string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)

      // notify parent with actual row objects
      onRowSelect?.(data.filter(d => next.has(d.id)))
      return next
    })
  }

  function toggleSelectAll() {
    setSelected(prev => {
      if (prev.size === data.length) {
        onRowSelect?.([])
        return new Set()
      }
      const all = new Set<number | string>(data.map(d => d.id))
      onRowSelect?.([...data])
      return all
    })
  }

  return (
    <div className="overflow-x-auto">
      <table role="table" className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th className="px-3 py-2 text-left">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  checked={selected.size === data.length && data.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
            )}

            {columns.map(col => (
              <th
                key={col.key}
                className={`px-3 py-2 text-left font-medium text-sm ${col.sortable ? 'cursor-pointer select-none' : ''}`}
                onClick={() => toggleSort(col)}
                scope="col"
              >
                <div className="flex items-center gap-2">
                  <span>{col.title}</span>
                  {col.sortable && sortKey === col.dataIndex && (
                    <span className="text-xs">{sortDir === 'asc' ? '▲' : sortDir === 'desc' ? '▼' : ''}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <tr>
              <td className="p-6 text-center" colSpan={columns.length + (selectable ? 1 : 0)}>
                Loading...
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td className="p-6 text-center text-gray-500" colSpan={columns.length + (selectable ? 1 : 0)}>
                No data to display
              </td>
            </tr>
          ) : (
            sortedData.map((row, _idx) => (
              <tr
                key={String(row.id)}
                className={`${
                  selected.has(row.id)
                    ? 'bg-gray-100 dark:bg-gray-900'
                    : 'odd:bg-gray-50 even:bg-white dark:odd:bg-transparent'
                } hover:bg-gray-100`}
              >
                {selectable && (
                  <td className="px-3 py-2">
                    <input
                      aria-label={`Select row ${String(row.id)}`}
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => toggleSelectRow(row.id)}
                    />
                  </td>
                )}

                {columns.map(col => (
                  <td key={String(col.key)} className="px-3 py-2 align-top text-sm whitespace-nowrap">
                    {String(row[col.dataIndex] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
