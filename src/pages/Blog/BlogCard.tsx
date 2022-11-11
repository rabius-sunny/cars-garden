import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  RingProgress
} from '@mantine/core'

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },

  footer: {
    textAlign: 'right',
    padding: `5px 10px 5px 0`,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`
  },

  title: {
    lineHeight: 1
  }
}))

export default function BlogCard() {
  const { classes } = useStyles()

  return (
    <Card withBorder p='md' className={classes.card}>
      <Card.Section>
        <Image src='/assets/images/blogcar.jpg' alt={data.title} height={120} />
      </Card.Section>

      <Group position='apart' mt='md'>
        <Text size='sm' weight={700} className={classes.title}>
          {data.title}
        </Text>
        <Group spacing={3}>
          <Text size='xs' weight={600} color='dimmed'>
            80% completed
          </Text>
          <RingProgress size={18} sections={[{ value: 80, color: 'blue' }]} />
        </Group>
      </Group>
      <Text color='dimmed' align='left' mb={4} size='xs'>
        {data.description}
      </Text>
      <Card.Section className={classes.footer}>
        <button className=' uppercase rounded text-primary font-bold bg-transparent'>
          read more
        </button>
      </Card.Section>
    </Card>
  )
}

const data = {
  title: 'Awesome Car Blogs',
  description:
    '56 km this month • 17% improvement compared to last month • 443 place in global scoreboard'
}
