export class ValidatorRules {
  async updateValues(data: any) {
    const now = new Date();
    if (!data.date || !data.time) {
      return {
        status: true,
        message: ''
      };
    }

    const dateTimeStr = `${data.date}T${data.time.padEnd(8, ':00')}`;
    const eventDate = new Date(dateTimeStr);

    if (isNaN(eventDate.getTime())) {
      return {
        status: false,
        message: 'Data ou hora inválida'
      };
    }

    const alreadyOccurred = eventDate < now;

    if (alreadyOccurred) {
      if ('date' in data || 'time' in data || 'value' in data) {
        return {
          status: false,
          message: 'Não é permitido alterar data, hora ou valor de eventos passados.'
        };
      };
    };

      return {
        status: true,
        message: ''
      };
  }
}