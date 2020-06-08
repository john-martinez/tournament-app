import axios from 'axios';

export function updateTournamentStatus (id, status, callback) {
  axios
    .put(`http://localhost:8000/tournament/${id}/${status}`, {})
    .then(_=>callback())
    .catch(err=>console.log(err))
}

export function deleteTournament(id, callback) {
  axios
    .delete(`http://localhost:8000/tournament/${id}/delete`)
    .then(_=>callback())
    .catch(err=>console.log(err))
}