import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import confetti from 'canvas-confetti';


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
  ' I don’t love you',
  ' Just a little',
  ' A little more than little',
  ' Bahot sara',
  ' Beintehaan',
  ' Till infinity and beyond'
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
      1: '❌: itna kam? 😢',
      2: '❌:  thoda sa aur kar lo plz',
      3: '❌: abhi bhi kam hi hai… itne se kaam nahi chalega',
      4: '❌:  hmm… good, but I deserve more… don’t you think?',
      5: '❌:  ab mujhe sharam aa rahi hai 🙈',
      6: 'bas kr! ab rulaegi kya pagli 😌'
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
  

  // STEP 5 - HAPPINESS QUESTION
selectedOption: number | null = null;
triedOptions = new Set<number>();
happinessMessage = '';
unlockHappiness = false;
showNextStepBtn = false;


selectOption(index: number) {
  this.selectedOption = index;
}

submitHappiness() {
  if (this.selectedOption === null) return;

  this.triedOptions.add(this.selectedOption);

  if (this.triedOptions.size === 3) {
    this.unlockHappiness = true;
    this.happinessMessage = 'Truth is my heart dances like this whenever I see you 💖';

    // ⏳ Show next button after 11 seconds
    setTimeout(() => {
      this.showNextStepBtn = true;
    }, 8000);  // 10–12 seconds
  }  else {
    this.happinessMessage = 'mmm wrong answer, please try again 😌';
  
    setTimeout(() => {
      // Only clear if still wrong and not unlocked
      if (!this.unlockHappiness) {
        this.happinessMessage = '';
      }
    }, 1000); // disappears after 1 sec
  }
  
}

goToStep6() {
  this.step = 6;

  // reset step 5 state
  this.showNextStepBtn = false;
  this.selectedOption = null;
  this.triedOptions.clear();
  this.happinessMessage = '';
  this.unlockHappiness = false;
}


@ViewChild('leftImg') leftImg!: ElementRef;
@ViewChild('rightImg') rightImg!: ElementRef;
@ViewChild('container') container!: ElementRef;

fillLevel = 0; // 0 → 180
showKiss = false;

kissX = 0;
kissY = 0;

showConfetti = false;

sendKiss() {

  if (this.fillLevel < 180) {
    this.fillLevel += 30;
  }

  const leftRect = this.leftImg.nativeElement.getBoundingClientRect();
  const rightRect = this.rightImg.nativeElement.getBoundingClientRect();
  const containerRect = this.container.nativeElement.getBoundingClientRect();

  // ✅ FIXED START POSITION (relative to container)
  this.kissX = leftRect.left - containerRect.left + leftRect.width / 2;
  this.kissY = leftRect.top - containerRect.top + leftRect.height / 2 - 40; // little up

  this.showKiss = true;

  setTimeout(() => {
    // ✅ END POSITION
    this.kissX = rightRect.left - containerRect.left + rightRect.width / 2;
    this.kissY = rightRect.top - containerRect.top + rightRect.height / 2 - 40;
  }, 50);

  setTimeout(() => {
    this.showKiss = false;
  }, 1700);

  // 🎉 CONFETTI WHEN FULL
  if (this.fillLevel >= 180) {
    this.fillLevel = 180;
  
    if (!this.showFinalCard) {
      this.launchConfetti();
    }
  }
  
  
  

}
showFinalCard = false;

private confettiRunning = false;

launchConfetti() {

  if (this.confettiRunning) return;
  this.confettiRunning = true;

  const shoot = () => {

    confetti({
      particleCount: 80,
      startVelocity: 40,
      spread: 120,
      ticks: 300,
      scalar: 1.3,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.6
      }
    });

    requestAnimationFrame(shoot);
  };

  shoot();

  // Show final card after small delay
  setTimeout(() => {
    this.showFinalCard = true;
  }, 2000);
}





  
}
