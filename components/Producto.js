import React from 'react'
import { gql, useMutation } from "@apollo/client";
import Swal from 'sweetalert2';
import Router from 'next/router';


const ELIMINAR_PRODUCTO=gql`
    mutation EliminarProducto($id: ID!) {
        eliminarProducto(id: $id)
    }
`
const OBTENER_PRODUCTOS= gql`
  query ObtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
      creado
    }
  }
`;

const Producto = ({producto}) => {

    const {nombre,existencia,precio,id}=producto

    const [eliminarProducto]=useMutation(ELIMINAR_PRODUCTO,{
        update(cache){
            const {obtenerProductos }=cache.readQuery({
                query:OBTENER_PRODUCTOS
            });
            cache.writeQuery({
                query:OBTENER_PRODUCTOS,
                data:{
                    obtenerProductos: obtenerProductos.filter(productoActual=>productoActual.id !==id)

                }
            })
        }

    });

    const confirmarEliminarProducto=()=>{

        Swal.fire({
            title: "¿Deseas eliminar a este producto?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            confirmButtonTex:"No, Cancelar"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                    const {data}=await eliminarProducto({
                        variables:{
                            id
                        }
                    })
                    Swal.fire({
                        title: "Eliminado",
                        text:data.eliminarProducto,
                        icon: "success"
                     });
                }catch(error){
                    console.log(error);

                
                }  
            }
          });
    }

    const editarProducto=()=>{

        Router.push({
         pathname: '/editarproducto/[id]',
         query:{id}
        })


    }

  return (
   
        <tr>
            <td className='border px-4 py-2'>{nombre}</td>
            <td className='border px-4 py-2'>{existencia}</td>
            <td className='border px-4 py-2'>$ {precio}</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs font-bold'
                    onClick={()=>confirmarEliminarProducto() }
                >
                    Eliminar
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className='flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs font-bold'
                    onClick={()=>editarProducto() }
                >
                Editar 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>

                </button>
        </td>
        </tr>
   
  )
}

export default Producto