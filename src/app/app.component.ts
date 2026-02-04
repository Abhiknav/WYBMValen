import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class AppComponent {

  step = 1;

  noActivated = false;
  confirmNoActivated = false;

  noBtnStyle: any = {};
  confirmNoStyle: any = {};

  // STEP 3 extras
  showNextPrompt = false;

  // STEP 4 slider
  loveValue = 0;
shake = false;
popupMessage = '';
// FINAL LOVE SUCCESS
showFinalGif = false;
showChupButton = false;

loveLabels = [
  '😑 I don’t love you',
  '🙂 Just a little',
  '😌 A little more than little',
  '😍 Bahot sara',
  '💖 Beintehaan',
  '♾️ Till infinity and beyond'
];

  onMouseMove(event: MouseEvent) {
    if (this.step === 1 && this.noActivated && this.isNear(event, this.noBtnStyle)) {
      this.noBtnStyle = this.randomScreenPosition();
    }

    if (this.step === 2 && this.confirmNoActivated && this.isNear(event, this.confirmNoStyle)) {
      this.confirmNoStyle = this.randomScreenPosition();
    }
  }

  activateAndTeleportNo() {
    this.noActivated = true;
    this.noBtnStyle = this.randomScreenPosition();
  }

  activateAndTeleportConfirmNo() {
    this.confirmNoActivated = true;
    this.confirmNoStyle = this.randomScreenPosition();
  }

  randomScreenPosition() {
    const padding = 120;
    return {
      position: 'fixed',
      left: `${Math.random() * (window.innerWidth - padding)}px`,
      top: `${Math.random() * (window.innerHeight - padding)}px`
    };
  }

  isNear(event: MouseEvent, style: any): boolean {
    if (!style.left || !style.top) return false;
    const dx = event.clientX - parseFloat(style.left);
    const dy = event.clientY - parseFloat(style.top);
    return Math.sqrt(dx * dx + dy * dy) < 150;
  }

  goToConfirm() {
    this.step = 2;
    this.confirmNoActivated = false;
    this.confirmNoStyle = {};
  }

  finalYes() {
    this.step = 3;

    // ⏳ show message after 2.5 sec
    setTimeout(() => {
      this.showNextPrompt = true;
    }, 2500);
  }

  goToSlider() {
    this.step = 4;
  }

  checkLove() {
    this.shake = false;
    this.popupMessage = '';
    this.showFinalGif = false;
    this.showChupButton = false;
  
    const messages: { [key: number]: string } = {
      1: '❌ itna kam? 😢',
      2: '🥺 thoda sa aur kar lo plz',
      3: '😔 abhi bhi kam hi hai… itne se kaam nahi chalega',
      4: '🫠 hmm… good, but I deserve more… don’t you think?',
      5: '🙈 ab mujhe sharam aa rahi hai',
      6: '🥹💖 ab rulaegi kya pagli'
    };
  
    this.popupMessage = messages[this.loveValue];
  
    // ❌ WRONG ANSWERS
    if (this.loveValue !== 6) {
      this.shake = true;
  
      setTimeout(() => {
        this.shake = false;
        this.popupMessage = '';
      }, 2000);
    }
  
    // ✅ FINAL CORRECT ANSWER
    if (this.loveValue === 6) {
      this.showFinalGif = true;
  
      // ⏳ show "chup" after 2 sec
      setTimeout(() => {
        this.showChupButton = true;
      }, 2000);
    }
  }
  
  endLoveMeter() {
    this.step = 5;
  
    // reset slider state
    this.popupMessage = '';
    this.showFinalGif = false;
    this.showChupButton = false;
  }
  

  
}
