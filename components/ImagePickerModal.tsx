import { Modal, TouchableOpacity, View, Pressable } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import Typo from './Typo'
import * as Icons from 'phosphor-react-native'
import { verticalScale } from '@/utils/styling'

interface ImagePickerModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (mode: 'camera' | 'gallery') => void;
}

const ImagePickerModal = ({ visible, onClose, onSelect }: ImagePickerModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
        
            <Pressable 
                className="flex-1 bg-black/50 justify-end" 
                onPress={onClose}
            >
            
                <View className="bg-neutral-800 rounded-t-[30px] p-6 pb-10 items-center">
                    <View className="w-10 h-1.5 bg-neutral-500 rounded-full mb-5" />

                    <Typo size={18} fontWeight="700" style={{marginBottom: 8}}>
                        Select Profile Photo
                    </Typo>

                    <View className="flex-row w-full justify-evenly">

                        <TouchableOpacity 
                            className="items-center gap-3"
                            onPress={() => { onSelect('camera'); onClose(); }}
                        >
                            <View className="p-4 bg-blue-500/10 rounded-2xl">
                                <Icons.Camera size={32} color="#3b82f6" weight="fill" />
                            </View>
                            <Typo size={14} fontWeight="600">Camera</Typo>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className="items-center gap-3"
                            onPress={() => { onSelect('gallery'); onClose(); }}
                        >
                            <View className="p-4 bg-purple-500/10 rounded-2xl">
                                <Icons.Image size={32} color="#a855f7" weight="fill" />
                            </View>
                            <Typo size={14} fontWeight="600">Gallery</Typo>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity 
                        onPress={onClose}
                        className="mt-8 w-full py-3 bg-neutral-700 rounded-xl items-center"
                    >
                        <Typo size={15} fontWeight="600" color={colors.neutral300}>Cancel</Typo>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    )
}

export default ImagePickerModal