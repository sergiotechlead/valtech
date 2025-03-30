import type { TableColumn } from '@vtex/admin-ui'
import {
  experimental_I18nProvider as I18nProvider,
  IconTrash,
  Skeleton,
  Table,
  useTableState,
  useDataViewState,
  DataView
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-apollo'

import { PAGE_SIZE } from '../../../utils/constants'
import { messages } from '../../../utils/messages'
import GET_FORTUNES from '../../../graphql/getCookieFortunes.graphql'
import { DeleteButton } from '../DeleteButton/DeleteButton'

interface Field {
  key: string;
  value: string;
}

interface Document {
  fields: Field[];
}

interface Input {
  documents: Document[];
}

interface CookieFortune {
  id: string;
  CookieFortune: string;
}

function transformCookieData(input: Input): CookieFortune[] {
  return input.documents.map(document => {
      const result: Partial<CookieFortune> = {};

      document.fields.forEach(field => {
          if (field.key === 'id') {
              result.id = field.value;
          } else if (field.key === 'CookieFortune') {
              result.CookieFortune = field.value;
          }
      });

      return result as CookieFortune;
  });
}

type TableColumns = {
  id: string
  CookieFortune: string
}

const CookieFortuneManagementTable: FC = () => {
  const intl = useIntl()
  const {
    culture: { locale },
  } = useRuntime()

  const view = useDataViewState()

  const { data, loading } = useQuery(GET_FORTUNES, {
    variables: {
      page: 1,
      pageSize: PAGE_SIZE
    },
    onCompleted: (resultData) => {
      if (resultData.documents.length > 0) {
        view.setStatus({
          type: 'ready',
        })
      } else {
        view.setStatus({
          type: 'empty',
          message: intl.formatMessage(messages.tableNoResults),
        })
      }
    },
    onError: () => {
      view.setStatus({
        type: 'error',
        message: intl.formatMessage(messages.tableDataError),
      })
    },
  })

  const columns: Array<TableColumn<TableColumns>> = [
    {
      id: 'id',
      width: "25%",
      header: intl.formatMessage(
        messages.cookieFortuneTableidColumnLabel
      ),
    },
    {
      id: 'CookieFortune',
      header: intl.formatMessage(messages.cookieFortuneTableNameColumnLabel),
    },
    {
      id: 'delete',
      header: () => <IconTrash />,
      width: 80,
      resolver: {
        type: 'root',
        render: function percentageRender({ item, context }) {
          if (context.status === 'loading') {
            return <Skeleton csx={{ height: 24 }} />
          }

          return (
            <I18nProvider locale={locale}>
              <DeleteButton item={item} />
            </I18nProvider>
          )
        },
      }
    },
  ]

  // Controls the loading state of the table
  useEffect(() => {
    console.log("UseEffect 4")
    if (loading && view && view.status !== 'loading') {
      view.setStatus({
        type: 'loading',
      })
    }
  }, [loading])

  const dataGridState = useTableState<TableColumns>({
    columns,
    length: 10,
    items: data ? transformCookieData(data) : [],
    view,
  })

  return (
    <I18nProvider locale={locale}>
      <DataView state={view}>
        <Table state={dataGridState} />
      </DataView>
    </I18nProvider>
  )
}

export default CookieFortuneManagementTable
