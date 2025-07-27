import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div style={{ width }}>
      <div className="text-2xl font-bold text-white">
        Blog
      </div>
    </div>
  )
}

export default Logo
