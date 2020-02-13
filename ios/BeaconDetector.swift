//
//  BeaconDetector.swift
//  AwesomeProject
//
//  Created by mauro amazonas on 04/01/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
//import Combine
import CoreLocation
import SwiftOSC

@available(iOS 13.0, *)
@objc(MyNativeModule)
class MyNativeModule: RCTEventEmitter, CLLocationManagerDelegate {
  
  var locationManager: CLLocationManager?
  var lastDistance = CLProximity.unknown
  var locationAccuracy: CLLocationAccuracy?
  var heading: Double
  var inside: DarwinBoolean
  var ready: DarwinBoolean
  var alive: DarwinBoolean
  var alive2: String
  var hasListeners: Bool
  private var UUID2: String
  private var major: UInt16
  private var minor: UInt16
  private var identifier: String
  private var beaconDistance: Double
  private var userId: NSNumber
  private var soundRaw: String
  private var soundName: String
  private var screenStatus: String
  private var serverIp: String
   private var serverPort: NSNumber
  var client:OSCClient?
  override init() {
    heading = 0
    inside = false
    ready = false
    alive = false
    alive2 = "dead"
    UUID2 = " "
    major = 0
    minor = 0
    identifier = " "
    beaconDistance = 0
    userId = 0
    soundRaw = "pitiznaider"
    soundName = "pitiznaider"
    screenStatus = "active"
    hasListeners = false
    serverIp = " "
    serverPort = 0
  super.init()
    locationManager = CLLocationManager()
    locationManager?.delegate = self
    locationManager?.requestWhenInUseAuthorization()
    locationManager?.startUpdatingHeading()
  }
  
  
  //Recebe os dados de configuração e distância do beacon e se tudo estiver certo começa a procurar
  @objc
  func setBeacon(_ uuid: String, ident: String, ma: NSNumber, mi: NSNumber, beaconRange: NSNumber) {
        print(uuid)
        print(ma)
        print(mi)
        print(ident)
        print(beaconRange)

        UUID2 = uuid
        major = UInt16(truncating: ma)
        minor = UInt16(truncating: mi)
        identifier = ident
        beaconDistance = Double(truncating: beaconRange)
        
    if ready == true {
      client = OSCClient(address: serverIp, port: Int(truncating: serverPort))
      startScanning()
    }
        
  }
  
  @objc
  func soundServer(_ ip: String , port: NSNumber) {
    serverIp = ip
    serverPort = port
    print(serverIp)
    print(serverPort)
  }
  
  
  //Recebe os dados atuais do usuário
  @objc
  func userInfo(_ userID: NSNumber, sound: String, sound2: String) {
    userId = userID
    soundRaw = sound2
    soundName = sound
  }
  
  //Verifica se está tudo ok para procurar os beacons incluindo autorização
  func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
      if status == .authorizedWhenInUse{
          if CLLocationManager.isMonitoringAvailable(for: CLBeaconRegion.self){
              if CLLocationManager.isRangingAvailable(){
                  //We are good to go!
                  ready = true
              }
          }
      }
  }
  
  //procura pelo beacon setado
  func startScanning( ){
      let uuid = UUID(uuidString: UUID2)!
      let constraint = CLBeaconIdentityConstraint(uuid: uuid, major: major, minor: minor)
      
      let beaconRegion = CLBeaconRegion(beaconIdentityConstraint: constraint, identifier: identifier)
      locationManager?.startMonitoring(for: beaconRegion)
      locationManager?.startRangingBeacons(satisfying: constraint)
  }
  
  //Captura os dados do beacon encontrado
  func locationManager(_ manager: CLLocationManager, didRange beacons: [CLBeacon], satisfying beaconConstraint: CLBeaconIdentityConstraint) {
      if let beacon = beacons.first{
        update(distance: Double(round(1000 * beacon.accuracy)/1000), proximity: beacon.proximity, degrees: heading)
         
          
      }else{
          update(distance: 0, proximity: .unknown, degrees: 0)
      }
  }
  
  //Verifica a direção em relação ao norte
  func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
    self.heading = Double(round(1 * newHeading.trueHeading) / 1)
   // print("Degree is \(heading)")
    //updateHeading()
  }
  
  
  //
  func update(distance: CLLocationAccuracy, proximity: CLProximity, degrees: Double){
    lastDistance = proximity
    
    
    //Verifica a distância
    var proximity2 = "unknown"
    if lastDistance == .immediate {
        proximity2 = "immediate"
    }else if lastDistance == .near {
        proximity2 = "near"
    }else if lastDistance == .far {
       proximity2 = "far"
    }else{
        proximity2 = "unknown"
    }
    let x = distance * cos(degrees * .pi / 180)
    let y = distance * sin(degrees * .pi / 180)
    
    //verifica se o usuario está dentro do raio
    if distance <= beaconDistance && distance > 0 {
      inside = true
    }else{
      inside = false
    }
  
    //Verifica se tem visada com o beacon, se a tela está ativa ou inativa e se está dentro do raio
    if inside == true && screenStatus == "active" && alive == false {
      alive = true
      alive2 = "alive"
      
      if userId != 0 && soundRaw != "pitiznaider" {
        sendOnOSC(userId, sound: soundRaw)
      }
      
    }else if  inside == false && userId != 0 && soundRaw != "pitiznaider"{
      if alive == true {
        alive = false
        alive2 = "dead"
        
        sendOffOSC(userId)
      }
    }else if inside == true && alive == true && screenStatus == "inactive" && userId != 0 && soundRaw != "pitiznaider"{
      alive = false
      alive2 = "dead"
      
      sendOffOSC(userId)
    }
     
    if alive == true && screenStatus == "active" && inside == true && userId != 0 && soundRaw != "pitiznaider"{
     updateLocation( x: x, y: y)
    }
    
    if hasListeners == true{
      sendEvent(withName: "onChange", body: ["distance": distance, "proximity": proximity2, "degrees":degrees, "alive":alive2, "userId": userId, "soundName": soundName, "soundRaw": soundRaw])
    }
  }//Fim Update
  
  
  //Mensagem pra atualizar localização do usuário
  func updateLocation( x: Double,  y: Double){
    let user = Int( truncating: userId)
    let message = OSCMessage(
          OSCAddressPattern("/posicaoObjeto"),
          x,
          y,
          user
      )
     // print("Distance is \(proximity2)")
    client?.send(message)
  }
  
  //Mensagem pra adicionar usuário
  func sendOnOSC(_ userID: NSNumber, sound: String){
    let user = Int( truncating: userID)
   // let sound = sound
    let message = OSCMessage(
          OSCAddressPattern("/addObjeto"),
          sound,
          user
      )
     // print("Distance is \(proximity2)")
    client?.send(message)
  }
  
  //Mensagem pra remover usuário
  func sendOffOSC(_ userID: NSNumber){
    let user = Int( truncating: userID)
    let message = OSCMessage(
          OSCAddressPattern("/removeObjeto"),
          user
      )
     // print("Distance is \(proximity2)")
    client?.send(message)
  }
  
  //Verifica se o app está em primeiro plano
  @objc
  func screenStatus(_ screen: String) {
    print("Screen", screen)
    print("Alive ", alive)
    print("Inside", inside)
    screenStatus = screen
    
  }

  
// MARK: RCTBridgeModule
  
  @objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }

  @objc
  
// MARK: Bridged methods
  
  override func startObserving() {
      hasListeners = true
  }
 
  override func stopObserving() {
      hasListeners = false
  }

  override func supportedEvents() -> [String]! {

  
    return ["onChange"]
  }
  
}


