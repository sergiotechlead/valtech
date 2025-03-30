import React, { useCallback, useState } from 'react'
import {
  IconTrash,
  Button,
  useModalState,
  ModalHeader,
  ModalContent,
  Modal,
  ModalFooter,
  ModalButton
} from '@vtex/admin-ui'
import { messages } from '../../../utils/messages'
import { useIntl } from 'react-intl'
import DELETE_COOKIE_FORTUNE_MESSAGE from './../../../graphql/deleteCookieFortuneMessage.graphql'
import { useMutation } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'

export const DeleteButton = ({ item }) => {
  const intl = useIntl()
  const modal = useModalState()
  const { navigate } = useRuntime()
  const [loading, setLoading] = useState(false)

  const [deleteCookieFortuneMessage, { loading: deleteMutationLoading }] = useMutation(
    DELETE_COOKIE_FORTUNE_MESSAGE,
    {
      variables: { messageId: item.id },
      onCompleted: () => {
        setLoading(true)
        navigate({
          page: 'admin.app.cookie-fortune.cookie-fortune-management'
        })
        modal.toggle()
      }
    }
  )

  const handleDelete = useCallback(() => {
    if (item.id) {
      deleteCookieFortuneMessage()
    }
    console.log("item.id")
  }, [item.id, deleteCookieFortuneMessage])

  return (
    <div>
      <Button onClick={modal.toggle} variant="critical">
        <IconTrash />
      </Button>

      <Modal aria-label={item?.CookieFortune} state={modal}>
        <ModalHeader>
          <div className="mr-auto">
            {intl.formatMessage(messages.cookieFortuneTableModalLabel)}
          </div>
        </ModalHeader>

        <ModalContent>
          {item?.CookieFortune}
        </ModalContent>

        <ModalFooter>
          <ModalButton variant="primary" closeModalOnClick>
            {intl.formatMessage(messages.cancelLabel)}
          </ModalButton>

          <Button
            variant="critical"
            loading={deleteMutationLoading || loading}
            onClick={handleDelete}
          >
            {intl.formatMessage(messages.cookieFortuneOrdersTableDeleteButton)}
            <IconTrash />
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
