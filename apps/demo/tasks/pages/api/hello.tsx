import { NextApiRequest, NextApiResponse } from 'next'

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ data: 'Hello World' })
}

export default handle
