import { Checkbox, UnstyledButton } from '@mantine/core'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { type Table } from '@tanstack/react-table'

import type { MonthlyBudget } from './Table'

export const HCheckbox = ({ table }: { table: Table<MonthlyBudget> }) => {
  return (
    <Checkbox
      size="xs"
      checked={table.getIsAllRowsSelected()}
      indeterminate={
        table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
      }
      onChange={table.getToggleAllRowsSelectedHandler()}
    />
  )
}

export const HExpand = ({ table }: { table: Table<MonthlyBudget> }) => {
  return (
    <UnstyledButton onClick={table.getToggleAllRowsExpandedHandler()}>
      {table.getIsAllRowsExpanded() ? (
        <IconChevronDown size={12} />
      ) : (
        <IconChevronRight size={12} />
      )}
    </UnstyledButton>
  )
}
