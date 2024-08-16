import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useState } from "react"
import axios from "axios"

export default function Signup() {
const [Username, SetUsername] = useState('');
const [Email, SetEmail] = useState('');
const [Password, SetPassword] = useState('');
const [Error, SetError] = useState('');
const [Success, SetSuccess] = useState(' ');

interface ErrorProps {
    response: any
    error: string;
    event: string;
}

const handlesubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
    const response = await axios.post('http://localhost:6030/auth/register', {
            Email,
            Password,
            name: Username,
          });
    
          // Handle success
          SetSuccess('Registration successful! Please check your email for verification.');
          SetError('');

    } catch (error: any){
        SetError((error as ErrorProps).response.data.error);
        SetSuccess('');
    }
}

return (
    <div className="flex justify-center items-center h-screen">
        <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold flex justify-center">Signup</CardTitle>
                <CardDescription className="text-center">Enter your details to create your account with ModelMerge</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlesubmit}>
                <div className="space-y-4">
                <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type="text" placeholder="username" required value = {Username} onChange={(e) => SetUsername(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required value={Email} onChange={(e) => SetEmail(e.target.value)}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required  value= {Password} onChange={(e) => SetPassword(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full hover:bg-red-600">
                        Sign-Up
                    </Button>
                </div>
                {Error && <div className="text-red-600">{Error}</div>}
                {Success && <div className="text-green-600">{Success}</div>}
                </form>
            </CardContent>
        </Card>
    </div>
)
}