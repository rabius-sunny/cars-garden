import { useState, useEffect } from 'react'
import {
  Container,
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Loader
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch
} from '@tabler/icons'
import useGet from 'hooks/useGet'
import useToken from 'hooks/useToken'
import dayjs from 'dayjs'

const useStyles = createStyles(theme => ({
  th: {
    padding: '0 !important'
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    }
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21
  }
}))

interface RowData {
  name: string
  type: string
  create: string
  charge: string
}
interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles()
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position='apart'>
          <Text weight={500} size='sm'>
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter(item =>
    keys(data[0]).some(key => item[key].toLowerCase().includes(query))
  )
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy])
      }

      return a[sortBy].localeCompare(b[sortBy])
    }),
    payload.search
  )
}

export default function OurServices() {
  const config = useToken()
  const { data: loadedData, loading } = useGet('/get-supplier-cars', '', config)
  const data = loadedData?.map((item: any) => ({
    name: item?.name,
    type: item?.type,
    create: item?.createdAt,
    charge: item?.charge
  }))
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data || [])
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  useEffect(() => {
    data !== undefined && setSortedData(data)
  }, [data])

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }

  const rows = sortedData.map((row: RowData) => (
    <tr key={row.create}>
      <td>{row.name}</td>
      <td>{row.type}</td>
      <td>{dayjs(row.create).format('DD MMM, YY')}</td>
      <td>{row.charge}</td>
    </tr>
  ))

  return (
    <Container size='lg' className='w-full'>
      <h1 className='text-2xl text-center sm:text-5xl font-bold text-primary my-8'>
        Our Services
      </h1>
      <hr />
      <ScrollArea>
        <TextInput
          placeholder='Search for cars'
          mb='md'
          icon={<IconSearch size={14} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table
          horizontalSpacing='md'
          verticalSpacing='xs'
          sx={{ tableLayout: 'fixed', minWidth: 700 }}
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === 'name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === 'charge'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                Type
              </Th>
              <Th
                sorted={sortBy === 'charge'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                Date
              </Th>
              <Th
                sorted={sortBy === 'charge'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                Charge
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={data?.length}>
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </Container>
  )
}
