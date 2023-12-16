import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import {useQuery,gql,useMutation} from '@apollo/client'
import {Formik} from 'formik'
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const OBTENER_CLIENTE=gql`
  query ObtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      nombre
      apellido
      email
      telefono
      empresa
    }
  }
  `;

const ACTUALIZAR_CLIENTE=gql`
  mutation ActualizarCliente($id: ID!, $input: ClienteInput) {
    actualizarCliente(id: $id, input: $input) {
      nombre
      apellido
      empresa
    }
  }
`;
const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor {
        id
        nombre
        apellido
        empresa
        email
    }
  }
   
`;

const EditarCliente = () => {

    //obtener el ID actual
    const router =useRouter();
    const {query:{id}}=router;

    //consultar para obtener el cliente
    const {data,loading,error}=useQuery(OBTENER_CLIENTE,{
      variables:{
        id
      }
    });

    //actualizar cliente

    const [ actualizarCliente]=useMutation(ACTUALIZAR_CLIENTE,{
      update(cache,{data:{actualizarCliente}}){
        //Obtener el objeto de cache que actualizaremos
        const { obtenerClientesVendedor}=cache.readQuery({query:OBTENER_CLIENTES_USUARIO});

        //reescribir cache
        cache.writeQuery({
            query:OBTENER_CLIENTES_USUARIO,
            data:{
                obtenerClientesVendedor:[...obtenerClientesVendedor, actualizarCliente]
            }
        })

    }
    })

    //Schema validacion

    const squemaValidacion= Yup.object({
      nombre:Yup.string()
      .required('El nombre del cliente es obligatorio'),
      apellido:Yup.string()
      .required('El apellido es obligatorio'),
      empresa:Yup.string()
      .required('La empresa es obligatorio'),
      email:Yup.string()
          .email('El email no es valido')
          .required('El email es obligatorio'),
  });

    if(loading) return 'cargando...'

    const{ obtenerCliente } = data

    //Modifica el cliente en la BD

    const actualizarInfoCliente= async valores=>{

      const {nombre,apellido,empresa,email,telefono}= valores
      try{
        const {data}=await actualizarCliente({
          variables:{
            id,
            input:{
              nombre,
              apellido,
              empresa,
              email,
              telefono
            }
          }
        })
        Swal.fire({
          title: "Actualizado",
          text:'El cliente se actualizao correctamente',
          icon: "success"
       });
       router.push('/')

      }catch(error){
        console.log(error);
      }

    }

   

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>
        <div className='flex justify-center mt-5'>
            <div className=" w-full max-w-lg">
              <Formik
                validationSchema={squemaValidacion}
                enableReinitialize
                initialValues={obtenerCliente}
                onSubmit={(valores)=> {
                   actualizarInfoCliente(valores)   
                }}
              >
                {props=>{
    
                   return(

                        <form 
                            className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                            onSubmit={props.handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                
                                </label>
                                <input
                                    className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline " 
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre Cliente"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.nombre}
                                />
                            </div>
                            {props.touched.nombre && props.errors.nombre ?(
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.nombre}</p>
                                        </div>
                            ): null }
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                  Apellido
                                
                                </label>
                                <input
                                    className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline " 
                                    id="apellido"
                                    type="text"
                                    placeholder="Apellido Cliente"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.apellido}
                                />
                            </div>
                            {props.touched.apellido && props.errors.apellido ?(
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.apellido}</p>
                                        </div>
                            ): null }
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                  Empresa
                                
                                </label>
                                <input
                                    className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline " 
                                    id="empresa"
                                    type="text"
                                    placeholder="Empresa Cliente"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.empresa}
                                />
                            </div>
                            {props.touched.empresa && props.errors.empresa ?(
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.empresa}</p>
                                        </div>
                            ): null }
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                  Email
                                
                                </label>
                                <input
                                    className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline " 
                                    id="email"
                                    type="email"
                                    placeholder="Email Cliente"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.email}
                                />
                            </div>
                            {props.touched.email && props.errors.email ?(
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.email}</p>
                                        </div>
                            ): null }
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                  Telefono
                                
                                </label>
                                <input
                                    className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline " 
                                    id="telefono"
                                    type="tel"
                                    placeholder="Telefono Cliente"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.telefono}
                                />
                            </div>
                            <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 "
                            value="EditarCliente"
                            />
                        </form>
                  )
                }}
              </Formik>

            </div>
          </div>


    </Layout>
    
  )
}

export default EditarCliente