// services.rs
// necessary crates
use sails_rs::{
    prelude::*,
    gstd::msg
};

// Import the state
use crate::states::*;
use crate::services::service::state::*;

#[derive(Default)]
pub struct Service;

impl Service {
    // Related function to init the service state (call only once)
    pub fn seed() {
        State::init_state();
    }
}

#[service]
impl Service {
    // Service constructor
    pub fn new() -> Self {
        Self
    }

    // Service to add a Profesionista
    pub fn add_profesionista(&mut self, id: ActorId, nombre: String, especialidad: String) -> Events {
        // Add Validations
        if nombre.is_empty() || especialidad.is_empty() {
            return Events::Error("Nombre o especialidad no pueden ser vacíos".into());
        }

        // Add logic
        add_profesionista(id, nombre, especialidad);

        // Return event
        Events::ProfesionistaAdded(id)
    }

    // Service to add a Cliente
    pub fn add_cliente(&mut self, id: ActorId, nombre: String) -> Events {
        // Add Validations
        if nombre.is_empty() {
            return Events::Error("El nombre no puede ser vacío".into());
        }

        // Add logic
        add_cliente(id, nombre);

        // Return event
        Events::ClienteAdded(id)
    }

    // Service to add a Trato
    pub fn add_trato(&mut self, profesionista_id: ActorId, cliente_id: ActorId, descripcion: String, pagos: [Option<(u128, bool)>; 5]) -> Events {
        // Add Validations
        if descripcion.is_empty() {
            return Events::Error("La descripción del trato no puede ser vacía".into());
        }

        // Add logic
        add_trato(profesionista_id, cliente_id, descripcion, pagos);

        // Return event
        Events::TratoAdded(profesionista_id, cliente_id)
    }

    // Query to retrieve all Profesionistas
    pub fn query_profesionistas(&self) -> Vec<Profesionista> {
        State::state_ref().profesionistas.clone()
    }

    // Query to retrieve all Clientes
    pub fn query_clientes(&self) -> Vec<Cliente> {
        State::state_ref().clientes.clone()
    }

    // Query to retrieve all Tratos
    pub fn query_tratos(&self) -> Vec<Trato> {
        State::state_ref().tratos.clone()
    }
}

// struct to use as a response to the user
#[derive(Encode, Decode, TypeInfo)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub enum Events {
    ProfesionistaAdded(ActorId),
    ClienteAdded(ActorId),
    TratoAdded(ActorId, ActorId),
    Error(String),
}