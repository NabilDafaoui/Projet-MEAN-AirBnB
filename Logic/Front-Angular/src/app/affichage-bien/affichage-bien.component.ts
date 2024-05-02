import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BiensService } from '../biens.service';
import { BiensDataService } from '../biens-data-service.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModalRef, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AvisService } from '../avis.service';
import { ReservationService } from '../reservation-service.service';
import { SDKGoogleMapComponent, SDKGoogleMapModule } from 'sdk-google-map';

@Component({
  selector: 'app-affichage-bien',
  standalone: true,
  imports: [CommonModule, FormsModule, SDKGoogleMapModule, NgbToastModule],
  templateUrl: './affichage-bien.component.html',
  styleUrls: ['./affichage-bien.component.css']
})
export class AffichageBienComponent implements OnInit {
  biens: any[] = [];
  afficherDetailsSupplementaires: boolean = false;
  showReservationModal: boolean = false;
  toastMessage: string = '';
  showSuccessToast: boolean = false;
  showErrorToast: boolean = false;
  showSuccessAvisToast: boolean = false;
  showErrorAvisToast: boolean = false;
  avisToastMessage: string = '';
  showAvisModal: boolean = false;
  selectedBienId: number = 0;
  selectedBien: any;
  note: number = 0;
  commentaire: string = '';
  modalRef: NgbModalRef | null = null;
  mailLoueur: string = '';
  dateDebut: string = '';
  dateFin: string = '';
  noteMoyenne: number = 0;

  constructor(
    private biensDataService: BiensDataService,
    private http: HttpClient,
    private modalService: NgbModal,
    private avisService: AvisService,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.biensDataService.biens$.subscribe(
      (biens) => {
        this.biens = biens;
        this.biens.forEach((bien) => {
          this.getBienNoteMoyenne(bien.idBien).then((noteMoyenne) => {
            bien.noteMoyenne = noteMoyenne;
            console.log("Note moyenne", noteMoyenne);
          });
        });
      }
    );
  }

  async getBienNoteMoyenne(idBien: number): Promise<number> {
    try {
      const noteMoyenne = await this.avisService.getNoteMoyenne(idBien).toPromise();
      return noteMoyenne || 0; // Utilisation d'une valeur par défaut si noteMoyenne est undefined
    } catch (error) {
      console.error('Erreur lors de la récupération de la note moyenne :', error);
      return 0; // ou une valeur par défaut appropriée
    }
  }
  
  
  reserverBien(bien: any, reservationModal: any): void {
    this.selectedBien = bien;
    this.mailLoueur = bien.mailProprio;
    this.showReservationModal = true;
    this.modalRef = this.modalService.open(reservationModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  enregistrerReservation(reservationModal: any): void {
    const reservation = {
      idBien: this.selectedBien.idBien,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      mailLoueur: this.mailLoueur,
      prixNuit: this.selectedBien.prixNuit
    };
  
    this.reservationService.createReservation(reservation).subscribe(
      (response) => {
        console.log('Réservation enregistrée avec succès:', response);
        this.toastMessage = 'Réservation enregistrée avec succès !';
        this.showSuccessToast = true;
        this.showReservationModal = false;
        this.modalRef?.close();
        // Réinitialiser les champs de saisie
        this.dateDebut = '';
        this.dateFin = '';
        this.mailLoueur = '';
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la réservation:', error);
        this.toastMessage = 'Une erreur est survenue lors de l\'enregistrement de la réservation.';
        this.showErrorToast = true;
      }
    );
  }

  ouvrirDialogueAvis(bien: any, avisModal: any): void {
    this.selectedBienId = bien.idBien;
    this.modalRef = this.modalService.open(avisModal, { ariaLabelledBy: 'modal-basic-title' });
    this.showAvisModal = true;
  }

  enregistrerAvis(avisModal: any): void {
    const avis = {
      idBien: this.selectedBienId,
      note: this.note,
      commentaire: this.commentaire
    };
    this.avisService.createAvis(avis).subscribe(
      (response) => {
        console.log('Avis enregistré avec succès :', response);
        this.showAvisModal = false;
        this.modalRef?.close();
        this.avisToastMessage = 'Avis enregistré avec succès !';
        this.showSuccessAvisToast = true;
        // Réinitialiser les champs de saisie
        this.note = 0;
        this.commentaire = '';
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'avis :', error);
        this.avisToastMessage = 'Une erreur est survenue lors de l\'enregistrement de l\'avis.';
        this.showErrorAvisToast = true;
      }
    );
  }
}
