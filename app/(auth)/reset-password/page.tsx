import ChangePassword from '@/components/auth/ResetPassword'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <div>
      <Suspense>

        <ChangePassword />
      </Suspense>
    </div>
  )
}
