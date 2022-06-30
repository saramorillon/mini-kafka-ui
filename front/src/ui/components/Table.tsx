import React, { ReactNode, TdHTMLAttributes } from 'react'
import { Error, Loading, NotFound } from './Helpers'

export interface IColumn<T> {
  header: ReactNode
  filter?: ReactNode
  cell: (row: T) => ReactNode
  props?: TdHTMLAttributes<HTMLTableCellElement>
}

interface ITableProps<T> {
  columns: IColumn<T>[]
  rows: T[]
  loading: boolean
  error?: unknown
}

export function Table<T>({ columns, rows, loading, error }: ITableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, key) => (
            <th key={key}>{column.header}</th>
          ))}
        </tr>
        <tr>
          {columns.map((column, key) => (
            <th key={key}>{column.filter}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns.length}>
              <Loading message="Loading messages" />
            </td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan={columns.length}>
              <Error message="Error starting consumer" />
            </td>
          </tr>
        ) : !rows.length ? (
          <tr>
            <td colSpan={columns.length}>
              <NotFound message="No message for now" />
            </td>
          </tr>
        ) : (
          rows.map((row, key1) => (
            <tr key={key1}>
              {columns.map((column, key2) => (
                <td key={key2} {...column.props}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}