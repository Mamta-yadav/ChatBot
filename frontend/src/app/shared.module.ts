import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

@NgModule({
  imports: [HttpClientModule],  // Add HttpClientModule here
  exports: [HttpClientModule],  // Export it to be used in standalone components
})
export class SharedModule {}
