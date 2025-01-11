// State.rs
// Necesary crates
use sails_rs::{
    prelude::*,
};

// Static mutable variable (contract's state)
pub static mut STATE: Option<State> = None;

// Create a struct for the contract's state
#[derive(Clone, Default)]
pub struct State {
    pub profesionistas: Vec<Profesionista>,
    pub clientes: Vec<Cliente>,
    pub tratos: Vec<Trato>,
}

// Struct to represent a Profesionista
#[derive(Clone, Encode, Decode, TypeInfo)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub struct Profesionista {
    pub id: ActorId,
    pub nombre: String,
    pub especialidad: String,
}

// Struct to represent a Cliente
#[derive(Clone, Encode, Decode, TypeInfo)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub struct Cliente {
    pub id: ActorId,
    pub nombre: String,
}

// Struct to represent a Trato
#[derive(Encode, Decode, TypeInfo, Clone)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub struct Trato {
    pub profesionista_id: ActorId,
    pub cliente_id: ActorId,
    pub descripcion: String,
    pub pagos: [Option<(u128, bool)>; 5], // Amount and if the work is confirmed
}

// Impl to set methods or related functions
impl State {
    // Method to create a new instance
    pub fn new() -> Self {
        Self { ..Default::default() }
    }

    // Related function to init the state
    pub fn init_state() {
        unsafe {
            STATE = Some(Self::new());
        };
    }

    // Related function to get the state as mut
    pub fn state_mut() -> &'static mut State {
        let state = unsafe { STATE.as_mut() };
        debug_assert!(state.is_some(), "The state is not initialized");
        unsafe { state.unwrap_unchecked() }
    }

    // Related function to get the state as ref
    pub fn state_ref() -> &'static State {
        let state = unsafe { STATE.as_ref() };
        debug_assert!(state.is_some(), "The state is not initialized");
        unsafe { state.unwrap_unchecked() }
    }
}

// Service to add a Profesionista
pub fn add_profesionista(id: ActorId, nombre: String, especialidad: String) {
    let state = State::state_mut();
    let new_profesionista = Profesionista { id, nombre, especialidad };
    state.profesionistas.push(new_profesionista);
}

// Service to add a Cliente
pub fn add_cliente(id: ActorId, nombre: String) {
    let state = State::state_mut();
    let new_cliente = Cliente { id, nombre };
    state.clientes.push(new_cliente);
}

// Service to add a Trato
pub fn add_trato(profesionista_id: ActorId, cliente_id: ActorId, descripcion: String, pagos: [Option<(u128, bool)>; 5]) {
    let state = State::state_mut();
    let new_trato = Trato { profesionista_id, cliente_id, descripcion, pagos };
    state.tratos.push(new_trato);
}

// Function to confirm a work for a specific payment installment
pub fn confirmar_trabajo(cliente_id: ActorId, trato_index: usize, pago_index: usize) {
    let state = State::state_mut();
    if let Some(trato) = state.tratos.get_mut(trato_index) {
        if trato.cliente_id == cliente_id {
            if let Some(Some((monto, _))) = trato.pagos.get_mut(pago_index) {
                *monto = *monto; // Confirm the work by setting the second element of the tuple to true
            }
        }
    }
}