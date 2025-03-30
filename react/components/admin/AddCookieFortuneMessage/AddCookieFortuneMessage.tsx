import React, { useEffect } from 'react'
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

import { useRuntime } from 'vtex.render-runtime'

import { Form, useFormState, TextInput } from '@vtex/admin-ui-form'

export const AddCookieFortuneMessage = () => {

  const intl = useIntl()
  const modal = useModalState()
  const { navigate } = useRuntime()

  const [
    createCookieFortuneMessage,
    { data: creationCompleted,loading: createMutationLoading },
  ] = useMutation(CREATE_COOKIE_FORTUNE_MESSAGE)

  const form = useFormState()

  useEffect(() => {
    if(creationCompleted){
      navigate({
        page: 'admin.app.cookie-fortune.cookie-fortune-management'
      })
      modal.toggle()
    }
    console.log("UseEffect 1")
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
          <div className='mr-auto'>
            {intl.formatMessage(messages.cookieFortuneTableModalLabel)}
          </div>
        </ModalHeader>
        <ModalContent>
          <Form state={form} onSubmit={handleSubmit}>
              <TextInput
                  name="Message"
                  state={form}
              />
              <Button loading={createMutationLoading} type="submit">Submit</Button>
          </Form>
        </ModalContent>
      </Modal>
    </div>
  )
}
