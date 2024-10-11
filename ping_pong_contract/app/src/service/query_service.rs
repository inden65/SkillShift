use sails_rs::prelude::*;

use crate::states::ping_pong_state::{
    PingState,
    UserData
};

// Struct to be used for query service
#[derive(Default)]
pub struct QueryService;

// Query service
// Here you can find all queries methods for the contract
#[service]
impl QueryService {
    // Service's constructor
    pub fn new() -> Self {
        Self
    }
    
    // Method that will return data from the last caller
    // Its a query because it only reads the state (it not change the state)
    pub fn last_who_call(&self) -> UserData {
        let (last_caller, action) = &PingState::state_ref().last_who_call;

        (*last_caller, action.clone())
    }

    // Method that will return all the calls of the contract
    // Its a query because it only reads the state (it not change the state)
    pub fn all_calls(&self) -> Vec<UserData> {
        PingState::state_ref()
            .all_calls
            .to_owned()
    }
}