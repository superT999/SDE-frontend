import userEvent from '@testing-library/user-event'
import { render, screen, act, waitFor } from '@testing-library/react';
import { Request, Response as NodeResponse } from 'node-fetch';
import Home from '../page'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next-router-mock";

jest.mock("next/navigation", () => require("next-router-mock"));
jest.spyOn(global, 'fetch').mockImplementation(() => 
  Promise.resolve(
    new Response(
      JSON.stringify({
        schemas: []  
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }  
      }
    )
  )
)

describe('Page', () => {
    it('renders form fields', () => {
        render(<Home />)
        expect(screen.getByText('User(*):')).toBeInTheDocument()
        expect(screen.getByText('Password(*):')).toBeInTheDocument()
        expect(screen.getByText('Host(*):')).toBeInTheDocument()
        expect(screen.getByText('Port(*):')).toBeInTheDocument()
        expect(screen.getByText('Database(*):')).toBeInTheDocument()
    })

    it('displays error if form is invalid on submit', async () => {
        render(<Home />)
        expect(await screen.findByText('Fill All the required fields')).toBeInTheDocument()
    })

    it('calls API on valid form submit', async () => {
        render(<Home />)
        await userEvent.type(screen.getByTestId('User'), 'test')
        await userEvent.type(screen.getByTestId('Password'), 'test') 
        await userEvent.type(screen.getByTestId('Host'), 'test')
        await userEvent.type(screen.getByTestId('Port'), '100')
        await userEvent.type(screen.getByTestId('Database'), 'test')
        await userEvent.click(screen.getByText('Explore')) 
        await expect(fetch).toHaveBeenCalledWith('/api/schema?user=test&password=test&host=test&port=100&database=test')  
    })
})
