import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {

    const router=useRouter();

  return (
    <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
        <div>
            <p className='text-white text-2xl font-bold'>CRM Clientes</p>
        </div>
        <nav className='mt-5 list-none'>
            <li className={router.pathname==='/' ? "bg-blue-900 p-2":"p-2"}>
                <Link href="/" legacyBehavior>
                    <a className='text-white mb-2 block'>
                        Clientes
                    </a>
                </Link> 
            </li>
            <li className={router.pathname==='/pedidos' ? "bg-blue-900 p-2":"p-2"}>
                <Link href="/pedidos" legacyBehavior>
                    <a className='text-white block'>
                         Pedidos
                    </a>
                  
                </Link> 
            </li>
            <li className={router.pathname==='/productos' ? "bg-blue-900 p-2":"p-2"}>
                <Link href="/productos" legacyBehavior>
                    <a className='text-white mb-2 block'>
                        Productos
                    </a>
                   
                </Link> 
            </li>
        </nav>
    </aside>
  )
}

export default Sidebar