import React, { useEffect, useState } from 'react'
import {
  Button,
  useModalState,
  ModalHeader,
  ModalContent,
  Modal
} from '@vtex/admin-ui'
import { messages } from '../../../utils/messages'
import { useIntl } from 'react-intl'

import CREATE_COOKIE_FORTUNE_MESSAGE from './../../../graphql/createCookieFortuneMessage.graphql'
import { useMutation } from 'react-apollo'

import { Form, useFormState, TextArea } from '@vtex/admin-ui-form'

export const AddCookieFortuneMessage = () => {

  const intl = useIntl()
  const modal = useModalState()
  const [loading, setLoading] = useState(false)

  const [
    createCookieFortuneMessage,
    { data: creationCompleted,loading: createMutationLoading },
  ] = useMutation(CREATE_COOKIE_FORTUNE_MESSAGE)

  const form = useFormState()

  useEffect(() => {
    if(creationCompleted){
      setLoading(true)
      window.location.reload()
    }
  }, [creationCompleted])


  const handleSubmit = (data:any) => {
    if(data){
      createCookieFortuneMessage({
        variables: {
          CookieFortuneMessage: String(data?.Message)
        }
      })
    }
  }

  return (
    <div>
      <Button onClick={modal.toggle} variant="primary">
        {intl.formatMessage(messages.addCookieFortuneTitle)}
      </Button>
      <Modal aria-label={intl.formatMessage(messages.cookieFortuneTableModalLabel)} state={modal}>
        <ModalHeader>
          <div className='mr-auto' style={{
            minWidth: "30vw"
          }}>
            {intl.formatMessage(messages.cookieFortuneTableModalLabel)}
          </div>
        </ModalHeader>
        <ModalContent>
          <Form state={form} onSubmit={handleSubmit}>
              <div>
                <TextArea
                    name="Message"
                    state={form}
                    maxLength={120}
                />
                <Button size="large" variant="primary" loading={createMutationLoading || loading} type="submit">
                  {intl.formatMessage(messages.addCookieFortuneTitle)}
                </Button>
              </div>
          </Form>
        </ModalContent>
      </Modal>
    </div>
  )
}
