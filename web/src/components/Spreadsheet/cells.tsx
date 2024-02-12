import { useState, useEffect } from 'react'

import { type Row, type Getter, Column, Table } from '@tanstack/react-table'
import { ChevronDown, ChevronRight } from 'lucide-react'

import { useMutation } from '@redwoodjs/web'

import { QUERY as FIND_THIS_MONTH_BUDGET } from 'src/components/MonthlyBudgetsCell'
import { useSelectedMonth, useSelectedYear } from 'src/lib/store'

import type { MonthlyBudget } from './columns'

import { Checkbox } from '@/ui/checkbox'
import { Input } from '@/ui/input'

export const CCheckbox = ({ row }: { row: Row<MonthlyBudget> }) => {
  return (
    <Checkbox
      borderColor="primary" // actually should already be primary without setting it again
      checked={row.getIsSelected() || row.getIsAllSubRowsSelected()}
      indeterminate={row.getIsSomeSelected()}
      onCheckedChange={() => {
        if (row.getCanExpand()) {
          row.toggleSelected(!row.getIsAllSubRowsSelected())
        } else {
          row.toggleSelected()
        }
      }}
    />
  )
}

export const CExpand = ({ row }: { row: Row<MonthlyBudget> }) => {
  return (
    <>
      {row.getCanExpand() ? (
        <button onClick={row.getToggleExpandedHandler()}>
          {row.getIsExpanded() ? (
            <ChevronDown size={12} />
          ) : (
            <ChevronRight size={12} />
          )}
        </button>
      ) : null}
    </>
  )
}

const UPDATE_BUDGET = gql`
  mutation UpdateAssignedBudgetForCategory(
    $categoryId: String!
    $month: Int!
    $year: Int!
    $input: UpdateAssignedBudgetForCategoryInput!
  ) {
    updateAssignedBudgetForCategory(
      categoryId: $categoryId
      month: $month
      year: $year
      input: $input
    ) {
      id
    }
  }
`

export const CEditableCurrency = ({
  getValue,
  row,
  column,
  table,
}: {
  getValue: Getter<number>
  row: Row<MonthlyBudget>
  column: Column<MonthlyBudget>
  table: Table<MonthlyBudget>
}) => {
  const convertToFloat = (str: string) => {
    const res = parseFloat(str.replace(/[^0-9.]/g, ''))
    return isNaN(res) ? 0 : res
  }

  const format = (str: string) => {
    const dec = convertToFloat(str)

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(dec)
  }

  const initialValue = format(getValue().toString())
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const tableMeta = table.options.meta as {
    updateData: (rowIndex: number[], columnId: string, value: string) => void
  }

  const [updateAssignedBudgetForCategory] = useMutation(UPDATE_BUDGET, {
    refetchQueries: [FIND_THIS_MONTH_BUDGET],
  })
  const month = useSelectedMonth()
  const year = useSelectedYear()

  const onBlur = () => {
    tableMeta.updateData(
      [row.getParentRow().index, row.index],
      column.id,
      value
    )
    setValue(format(value))
    if (!row.getCanExpand()) {
      updateAssignedBudgetForCategory({
        variables: {
          categoryId: row.original.id,
          month,
          year,
          input: { assigned: convertToFloat(value) },
        },
      })
    }
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
    e.target.select()
    setValue(convertToFloat(e.target.value).toString())
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value)

  return (
    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      h="8"
      w="28"
      _hover={{ borderColor: 'input', bgColor: 'background' }}
      borderColor="transparent"
      bgColor="transparent"
    />
  )
}

export const CCurrency = ({ getValue }: { getValue: Getter<number> }) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(getValue())

  return <span>{formatted}</span>
}

export const CCategory = ({ getValue }: { getValue: Getter<string> }) => {
  return <div>{getValue()}</div>
}