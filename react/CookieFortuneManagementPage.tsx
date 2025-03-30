import {
  ThemeProvider,
  Page,
  PageContent,
  PageHeader,
  PageHeaderTop,
  PageHeaderTitle,
  PageHeaderActions,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'

import CookieFortuneManagementTable from './components/admin/cookiesTable/CookieFortuneManagementTable'
import { messages } from './utils/messages'

import { AddCookieFortuneMessage } from './components/admin/AddCookieFortuneMessage/AddCookieFortuneMessage'

const CookieFortuneManagementPage: FC = () => {
  const intl = useIntl()

  return (
    <ThemeProvider>
      <Page>
        <PageHeader>
          <PageHeaderTop>
            <PageHeaderTitle>
              {intl.formatMessage(messages.cookieFortunePageHeaderTitle)}
            </PageHeaderTitle>
            <PageHeaderActions>
              <AddCookieFortuneMessage />
            </PageHeaderActions>
          </PageHeaderTop>
        </PageHeader>
        <PageContent layout="wide">
            <CookieFortuneManagementTable />
        </PageContent>
      </Page>
    </ThemeProvider>
  )
}

export default CookieFortuneManagementPage
