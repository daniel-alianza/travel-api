export class EmailMessage {
  constructor(
    public readonly to: string | string[],
    public readonly subject: string,
    public readonly html: string,
    public readonly bcc?: string[],
    public readonly from?: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.to || (Array.isArray(this.to) && this.to.length === 0)) {
      throw new Error('El campo "to" es requerido y no puede estar vacío');
    }

    if (!this.subject || this.subject.trim().length === 0) {
      throw new Error('El campo "subject" es requerido');
    }

    if (!this.html || this.html.trim().length === 0) {
      throw new Error('El campo "html" es requerido');
    }

    if (Array.isArray(this.to)) {
      const invalidEmails = this.to.filter(
        (email) => !this.isValidEmail(email),
      );
      if (invalidEmails.length > 0) {
        throw new Error(`Emails inválidos: ${invalidEmails.join(', ')}`);
      }
    } else if (!this.isValidEmail(this.to)) {
      throw new Error(`Email inválido: ${this.to}`);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getRecipientsAsString(): string {
    return Array.isArray(this.to) ? this.to.join(', ') : this.to;
  }

  hasBcc(): boolean {
    return this.bcc !== undefined && this.bcc.length > 0;
  }
}

export class TeamsNotificationMessage {
  constructor(
    public readonly type: string,
    public readonly requestId?: number,
    public readonly userName?: string,
    public readonly userEmail?: string,
    public readonly managerEmail?: string,
    public readonly managerName?: string,
    public readonly status?: string,
    public readonly totalAmount?: number,
    public readonly approverName?: string,
    public readonly comment?: string,
    public readonly selectedCard?: string,
    public readonly company?: string,
    public readonly branch?: string,
    public readonly travelReason?: string,
    public readonly departureDate?: Date,
    public readonly returnDate?: Date,
    public readonly disbursementDate?: Date,
    public readonly message?: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.type || this.type.trim().length === 0) {
      throw new Error('El campo "type" es requerido');
    }

    if (this.userEmail && !this.isValidEmail(this.userEmail)) {
      throw new Error(`Email de usuario inválido: ${this.userEmail}`);
    }

    if (this.managerEmail && !this.isValidEmail(this.managerEmail)) {
      throw new Error(`Email de manager inválido: ${this.managerEmail}`);
    }

    if (this.totalAmount !== undefined && this.totalAmount < 0) {
      throw new Error('El monto total no puede ser negativo');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  hasRequestId(): boolean {
    return this.requestId !== undefined && this.requestId > 0;
  }

  hasDates(): boolean {
    return (
      this.departureDate !== undefined ||
      this.returnDate !== undefined ||
      this.disbursementDate !== undefined
    );
  }

  toPlainObject(): Record<string, unknown> {
    return {
      type: this.type,
      requestId: this.requestId,
      userName: this.userName,
      userEmail: this.userEmail,
      managerEmail: this.managerEmail,
      managerName: this.managerName,
      status: this.status,
      totalAmount: this.totalAmount,
      approverName: this.approverName,
      comment: this.comment,
      selectedCard: this.selectedCard,
      company: this.company,
      branch: this.branch,
      travelReason: this.travelReason,
      departureDate: this.departureDate,
      returnDate: this.returnDate,
      disbursementDate: this.disbursementDate,
      message: this.message,
    };
  }
}
