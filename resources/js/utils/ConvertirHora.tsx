export function convertirHoraAMPM(hora24: string) {
    const [hora, minutos] = hora24.split(':');
    const horaNum = parseInt(hora, 10);
    const ampm = horaNum >= 12 ? 'PM' : 'AM';
    const hora12 = horaNum % 12 || 12;
    return `${hora12}:${minutos} ${ampm}`;
}