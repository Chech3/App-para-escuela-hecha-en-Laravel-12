export function convertirHoraAMPM(hora24?: string) {
    if (!hora24 || !hora24.includes(':')) return ''; // evita errores si no viene hora
    const [hora, minutos] = hora24.split(':');
    const horaNum = parseInt(hora, 10);
    const ampm = horaNum >= 12 ? 'PM' : 'AM';
    const hora12 = horaNum % 12 || 12;
    return `${hora12}:${minutos} ${ampm}`;
}
