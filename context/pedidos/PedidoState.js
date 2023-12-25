import React,{useReducer} from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

import { 
    SELECCIONAR_PRODUCTO,
    SELECCIONAR_CLIENTE,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from "@/types";

const PedidoState=({children})=>{

    //State de Pedidos
    const initialState={
        cliente:{},
        productos:[],
        total:0
    }
    const [state,dispatch ] = useReducer(PedidoReducer,initialState);

    //modificar el cliente
    const agregarCliente=(cliente)=>{
   
        dispatch({
            type:SELECCIONAR_CLIENTE,
            payload:cliente
        })
    }
    const agregarProducto=productosSeleccionados=>{

        let nuevoState;
        if(state.productos.length > 0){
            //tomar del segundo arreglo una copia y asignar al primero
            nuevoState=productosSeleccionados.map(producto=>{
                const nuevoObjeto=state.productos.find( productoState=>productoState.id===producto.id);
                return{...producto, ... nuevoObjeto}
            })

        }else{
            nuevoState=productosSeleccionados
        }

        dispatch({
            type:SELECCIONAR_PRODUCTO,
            payload:nuevoState
        })

    }

    const cantidadProductos=nuevoProducto=>{
      dispatch({
        type:CANTIDAD_PRODUCTOS,
        payload:nuevoProducto
      })
       
    }
    const actualizarTotal=()=>{
      dispatch({
        type:ACTUALIZAR_TOTAL
      })
    }


    return(
        <PedidoContext.Provider
            value={{
                productos:state.productos,
                agregarCliente,
                agregarProducto,
                cantidadProductos,
                actualizarTotal,
                total:state.total,
                cliente:state.cliente
            }}
        >
            {children}

        </PedidoContext.Provider>

    )

}
export default PedidoState