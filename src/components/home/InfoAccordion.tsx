import { Accordion, Container, Grid } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import { addInfo, faq } from 'static/accordionData'

export default function InfoAccordion() {
  return (
    <section className='my-12'>
      <Container size='lg'>
        <Grid>
          <Grid.Col span={12} md={6}>
            <div className='border border-gray-300 rounded-lg p-3 sm:p-4'>
              <h1 className='text-xl font-extrabold sm:text-3xl'>
                Frequently Asked Questions
              </h1>
              <hr className='my-3' />
              <Accordion
                chevron={<IconPlus size={16} />}
                styles={{
                  item: {
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ededed',
                    transition: '0.3s all ease-in-out',
                    '&[data-active]': {
                      backgroundColor: '#fff',
                      transform: 'scale(1.03)',
                      boxShadow:
                        'rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px',
                      borderColor: 'rgb(233, 236, 239)',
                      borderRadius: '8px',
                      zIndex: 1
                    },
                    ':last-child': {
                      borderRadius: '0 0 8px 8px'
                    }
                  },
                  label: {
                    fontWeight: 'bold'
                  },

                  chevron: {
                    '&[data-rotate]': {
                      transform: 'rotate(45deg)'
                    }
                  }
                }}
              >
                {faq.map((item, idx) => (
                  <Accordion.Item value={item.value} key={idx}>
                    <Accordion.Control>{item.control}</Accordion.Control>
                    <Accordion.Panel>{item.panel}</Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <div className='border border-gray-300 rounded-lg p-3 sm:p-4'>
              <h1 className='text-xl font-extrabold sm:text-3xl'>
                Additional Information
              </h1>
              <hr className='my-3' />
              <Accordion
                chevron={<IconPlus size={16} />}
                styles={{
                  item: {
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ededed',
                    transition: '0.3s all ease-in-out',
                    '&[data-active]': {
                      backgroundColor: '#fff',
                      transform: 'scale(1.03)',
                      boxShadow:
                        'rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px',
                      borderColor: 'rgb(233, 236, 239)',
                      borderRadius: '8px',
                      zIndex: 1
                    },
                    ':last-child': {
                      borderRadius: '0 0 8px 8px'
                    }
                  },
                  label: {
                    fontWeight: 'bold'
                  },

                  chevron: {
                    '&[data-rotate]': {
                      transform: 'rotate(45deg)'
                    }
                  }
                }}
              >
                {addInfo.map((item, idx) => (
                  <Accordion.Item value={item.control} key={idx}>
                    <Accordion.Control>{item.control}</Accordion.Control>
                    <Accordion.Panel>
                      <div className='flex gap-3 flex-wrap'>
                        {item.panel.map((keys, i) => (
                          <span
                            key={i}
                            className='text-primary font-semibold underline cursor-pointer'
                          >
                            {keys}
                          </span>
                        ))}
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  )
}
