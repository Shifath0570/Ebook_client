
// import { getUserSession } from "@/lib/core/session";

// const WriterPage = async () => {

//     const user = await getUserSession()

//     // console.log(user)



//     return (
//         <div>
//             <h2>WelCome Back writer {user?.name}</h2>
//         </div>
//     );
// };

// export default WriterPage;




import React, { useState } from 'react';
import { Input, Select, SelectItem, Button } from '@heroui/react';

const roles = [
  { key: 'Storyteller', label: 'Storyteller' },
  { key: 'Reader', label: 'Reader' },
  { key: 'Editor', label: 'Editor' },
];

export default function WelcomePage() {
  const [formData, setFormData] = useState({ name: '', role: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;

    setLoading(true);
    try {
      await fetch('http://localhost:5000/api/users/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert(`Welcome to Fable, ${formData.name}!`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-sm space-y-8 bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-violet-500">Fable</h1>
          <p className="text-sm text-zinc-400">Enter your name and choose a role to begin.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Name"
            placeholder="Enter your name"
            variant="bordered"
            isRequired
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Select
            label="Role"
            placeholder="Select your role"
            variant="bordered"
            isRequired
            selectedKeys={formData.role ? [formData.role] : []}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            {roles.map((role) => (
              <SelectItem key={role.key} value={role.key}>
                {role.label}
              </SelectItem>
            ))}
          </Select>

          <Button
            type="submit"
            color="secondary"
            className="w-full font-medium"
            isLoading={loading}
          >
            Get Started
          </Button>
        </form>

      </div>
    </div>
  );
}