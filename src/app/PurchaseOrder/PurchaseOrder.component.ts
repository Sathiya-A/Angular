/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PurchaseOrderService } from './PurchaseOrder.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-purchaseorder',
  templateUrl: './PurchaseOrder.component.html',
  styleUrls: ['./PurchaseOrder.component.css'],
  providers: [PurchaseOrderService]
})
export class PurchaseOrderComponent implements OnInit {
  objDate = Date.now();
 

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  POId = new FormControl('', Validators.required);
  poDate = new FormControl('', Validators.required);
  vendor = new FormControl('', Validators.required);
  shippingMethod = new FormControl('', Validators.required);
  referencePOId = new FormControl('', Validators.required);
  shipDate = new FormControl('', Validators.required);
  expectedDeliveryDate = new FormControl('', Validators.required);
  shipmentTerm = new FormControl('', Validators.required);
  shipTo = new FormControl('', Validators.required);
  items = new FormControl('', Validators.required);
  subTotal = new FormControl('', Validators.required);
  processingFees = new FormControl('', Validators.required);
  taxRate = new FormControl('', Validators.required);
  tax = new FormControl('', Validators.required);
  total = new FormControl('', Validators.required);
  note = new FormControl('', Validators.required);
  is_accepted = new FormControl('', Validators.required);
  rejectReason = new FormControl('', Validators.required);

  constructor(public servicePurchaseOrder: PurchaseOrderService, fb: FormBuilder) {
    this.myForm = fb.group({
      POId: this.POId,
      poDate: this.poDate,
      vendor: this.vendor,
      shippingMethod: this.shippingMethod,
      referencePOId: this.referencePOId,
      shipDate: this.shipDate,
      expectedDeliveryDate: this.expectedDeliveryDate,
      shipmentTerm: this.shipmentTerm,
      shipTo: this.shipTo,
      items: this.items,
      subTotal: this.subTotal,
      processingFees: this.processingFees,
      taxRate: this.taxRate,
      tax: this.tax,
      total: this.total,
      note: this.note,
      is_accepted: this.is_accepted,
      rejectReason: this.rejectReason
    });
  };


  ngOnInit(): void {
    this.loadAll();
      
  }
 populate(s1,s2)
  {
    
    s1=document.getElementById(s1);
    s2= document.getElementById(s2);
   
     s2.innerHTML=" ";
     if(s1.value=="A")
     {
       var optionarray=["x|X","y|Y","z|Z"];

     }
     if(s1.value=="B")
     {
       var optionarray=["1|1","2|2","3|3"];

     }
     if(s1.value=="C")
     {
       var optionarray=["a|a","b|b","c|c"];

     }

     for(var option in optionarray )
     {
       var pair=optionarray[option].split("|");
       var newoption=document.createElement("option");
      newoption.innerText=pair[0];
      newoption.value=pair[1];
      s2.options.add(newoption);

     }

  }


  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePurchaseOrder.getAll()
    .toPromise()
    .then((result) => {
      console.log(result);
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.jarvis.net.PurchaseOrder',
      'POId': this.POId.value,
      'poDate': this.poDate.value,
      'vendor': this.vendor.value,
      'shippingMethod': this.shippingMethod.value,
      'referencePOId': this.referencePOId.value,
      'shipDate': this.shipDate.value,
      'expectedDeliveryDate': this.expectedDeliveryDate.value,
      'shipmentTerm': this.shipmentTerm.value,
      'shipTo': this.shipTo.value,
      'items': this.items.value,
      'subTotal': this.subTotal.value,
      'processingFees': this.processingFees.value,
      'taxRate': this.taxRate.value,
      'tax': this.tax.value,
      'total': this.total.value,
      'note': this.note.value,
      'is_accepted': this.is_accepted.value,
      'rejectReason': this.rejectReason.value
    };

    this.myForm.setValue({
      'POId': null,
      'poDate': null,
      'vendor': null,
      'shippingMethod': null,
      'referencePOId': null,
      'shipDate': null,
      'expectedDeliveryDate': null,
      'shipmentTerm': null,
      'shipTo': null,
      'items': null,
      'subTotal': null,
      'processingFees': null,
      'taxRate': null,
      'tax': null,
      'total': null,
      'note': null,
      'is_accepted': null,
      'rejectReason': null
    });

    return this.servicePurchaseOrder.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'POId': null,
        'poDate': null,
        'vendor': null,
        'shippingMethod': null,
        'referencePOId': null,
        'shipDate': null,
        'expectedDeliveryDate': null,
        'shipmentTerm': null,
        'shipTo': null,
        'items': null,
        'subTotal': null,
        'processingFees': null,
        'taxRate': null,
        'tax': null,
        'total': null,
        'note': null,
        'is_accepted': null,
        'rejectReason': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.jarvis.net.PurchaseOrder',
      'poDate': this.poDate.value,
      'vendor': this.vendor.value,
      'shippingMethod': this.shippingMethod.value,
      'referencePOId': this.referencePOId.value,
      'shipDate': this.shipDate.value,
      'expectedDeliveryDate': this.expectedDeliveryDate.value,
      'shipmentTerm': this.shipmentTerm.value,
      'shipTo': this.shipTo.value,
      'items': this.items.value,
      'subTotal': this.subTotal.value,
      'processingFees': this.processingFees.value,
      'taxRate': this.taxRate.value,
      'tax': this.tax.value,
      'total': this.total.value,
      'note': this.note.value,
      'is_accepted': this.is_accepted.value,
      'rejectReason': this.rejectReason.value
    };

    return this.servicePurchaseOrder.updateAsset(form.get('POId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicePurchaseOrder.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicePurchaseOrder.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'POId': null,
        'poDate': null,
        'vendor': null,
        'shippingMethod': null,
        'referencePOId': null,
        'shipDate': null,
        'expectedDeliveryDate': null,
        'shipmentTerm': null,
        'shipTo': null,
        'items': null,
        'subTotal': null,
        'processingFees': null,
        'taxRate': null,
        'tax': null,
        'total': null,
        'note': null,
        'is_accepted': null,
        'rejectReason': null
      };

      if (result.POId) {
        formObject.POId = result.POId;
      } else {
        formObject.POId = null;
      }

      if (result.poDate) {
        formObject.poDate = result.poDate;
      } else {
        formObject.poDate = null;
      }

      if (result.vendor) {
        formObject.vendor = result.vendor;
      } else {
        formObject.vendor = null;
      }

      if (result.shippingMethod) {
        formObject.shippingMethod = result.shippingMethod;
      } else {
        formObject.shippingMethod = null;
      }

      if (result.referencePOId) {
        formObject.referencePOId = result.referencePOId;
      } else {
        formObject.referencePOId = null;
      }

      if (result.shipDate) {
        formObject.shipDate = result.shipDate;
      } else {
        formObject.shipDate = null;
      }

      if (result.expectedDeliveryDate) {
        formObject.expectedDeliveryDate = result.expectedDeliveryDate;
      } else {
        formObject.expectedDeliveryDate = null;
      }

      if (result.shipmentTerm) {
        formObject.shipmentTerm = result.shipmentTerm;
      } else {
        formObject.shipmentTerm = null;
      }

      if (result.shipTo) {
        formObject.shipTo = result.shipTo;
      } else {
        formObject.shipTo = null;
      }

      if (result.items) {
        formObject.items = result.items;
      } else {
        formObject.items = null;
      }

      if (result.subTotal) {
        formObject.subTotal = result.subTotal;
      } else {
        formObject.subTotal = null;
      }

      if (result.processingFees) {
        formObject.processingFees = result.processingFees;
      } else {
        formObject.processingFees = null;
      }

      if (result.taxRate) {
        formObject.taxRate = result.taxRate;
      } else {
        formObject.taxRate = null;
      }

      if (result.tax) {
        formObject.tax = result.tax;
      } else {
        formObject.tax = null;
      }

      if (result.total) {
        formObject.total = result.total;
      } else {
        formObject.total = null;
      }

      if (result.note) {
        formObject.note = result.note;
      } else {
        formObject.note = null;
      }

      if (result.is_accepted) {
        formObject.is_accepted = result.is_accepted;
      } else {
        formObject.is_accepted = null;
      }

      if (result.rejectReason) {
        formObject.rejectReason = result.rejectReason;
      } else {
        formObject.rejectReason = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'POId': null,
      'poDate': null,
      'vendor': null,
      'shippingMethod': null,
      'referencePOId': null,
      'shipDate': null,
      'expectedDeliveryDate': null,
      'shipmentTerm': null,
      'shipTo': null,
      'items': null,
      'subTotal': null,
      'processingFees': null,
      'taxRate': null,
      'tax': null,
      'total': null,
      'note': null,
      'is_accepted': null,
      'rejectReason': null
      });
  }
 

}
