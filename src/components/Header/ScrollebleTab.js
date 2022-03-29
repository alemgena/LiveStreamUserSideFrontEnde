import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
export default function ScrollableTabsButtonAuto() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ maxWidth: 500, bgcolor: '#111' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="secondary"
        aria-label="scrollable auto tabs example"
      >
        <Tab
          style={{ color: 'white' }}
          label="Treading"
          component={Link}
          to="/Trending"
        />
        <Tab
          style={{ color: 'white' }}
          label="TV Series"
          component={Link}
          to="/series"
        />
        <Tab
          style={{ color: 'white' }}
          component={Link}
          to="/movies"
          label="Movies"
        />
        <Tab
          style={{ color: 'white' }}
          component={Link}
          to="/uploadVideo"
          label="Upload Video"
        />
        <Tab style={{ color: 'white' }} label="LiveStream" />
      </Tabs>
    </Box>
  )
}
